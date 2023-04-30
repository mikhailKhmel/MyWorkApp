using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using NotesApp.Database;
using NotesApp.Hubs;
using NotesApp.Models;

namespace NotesApp.Controllers;

[ApiController]
[Route("[controller]")]
public class SyncController : ControllerBase
{
    private readonly MyDbContext _context;
    private readonly IHubContext<MyHub> _hubContext;

    public SyncController(MyDbContext context, IHubContext<MyHub> hubContext)
    {
        _context = context;
        _hubContext = hubContext;
    }

    [HttpGet("GetData/{userId}")]
    public async Task<(List<Folder>, List<Note>, Profile)> GetData(Guid userId)
    {
        var folders = _context.Folders.Where(x => x.UserId == userId);
        var notes = _context.Notes.Where(x => x.UserId == userId);
        var profile = await _context.Profiles.FirstAsync(x => x.Id == userId);
        return (folders.ToList(), notes.ToList(), profile);
    }

    [HttpPost]
    public async Task Sync(SyncData data)
    {
        var userId = data.userId;
        var notes = data.notes;
        var folders = data.folders;
        
        var correctNotes = new List<Note>();
        var correctFolders = new List<Folder>();

        var serverNotes = _context.Notes.Where(x => x.UserId == userId).ToList();
        var serverFolders = _context.Folders.Where(x => x.UserId == userId).ToList();

        if (notes.Count == 0 && serverNotes.Count != 0)
        {
            correctNotes = new List<Note>(serverNotes);
        }
        else if (serverNotes.Count == 0 && notes.Count != 0)
        {
            correctNotes = new List<Note>(notes);
        }
        else if (serverNotes.Count == 0 && notes.Count == 0)
        {
            correctNotes = new List<Note>();
        }
        else
        {
            var serverNotesIds = serverNotes.Select(x => x.Id);
            var clientNotesIds = notes.Select(x => x.Id);
            var clientHasServerNotHas = notes.Where(x => !serverNotesIds.Contains(x.Id));
            var serverHasClientNotHas = serverNotes.Where(x => !clientNotesIds.Contains(x.Id));
            var clientNotHasServerNotHas = notes.Where(x => serverNotesIds.Contains(x.Id));

            foreach (var note in clientNotHasServerNotHas)
            {
                var clientLastUpdate = note.LastUpdate;
                var serverNote = serverNotes.Find(x => x.Id == note.Id);

                if (clientLastUpdate > serverNote.LastUpdate)
                {
                    correctNotes.Add(note);
                }
                else
                {
                    correctNotes.Add(serverNote);
                }
            }

            correctNotes.AddRange(clientHasServerNotHas);
            correctNotes.AddRange(serverHasClientNotHas);
        }

        if (folders.Count == 0 && serverFolders.Count != 0)
        {
            correctFolders = new List<Folder>(serverFolders);
        }
        else if (serverFolders.Count == 0 && folders.Count != 0)
        {
            correctFolders = new List<Folder>(folders);
        }
        else if (serverFolders.Count == 0 && folders.Count == 0)
        {
            correctFolders = new List<Folder>();
        }
        else
        {
            var serverFoldersIds = serverFolders.Select(x => x.Id);
            var clientFoldersIds = folders.Select(x => x.Id);
            var clientHasServerNotHas = folders.Where(x => !serverFoldersIds.Contains(x.Id));
            var serverHasClientNotHas = serverFolders.Where(x => !clientFoldersIds.Contains(x.Id));
            var clientNotHasServerNotHas = folders.Where(x => serverFoldersIds.Contains(x.Id));

            foreach (var note in clientNotHasServerNotHas)
            {
                var clientLastUpdate = note.LastUpdate;
                var serverFolder = serverFolders.Find(x => x.Id == note.Id);

                if (clientLastUpdate > serverFolder.LastUpdate)
                {
                    correctFolders.Add(note);
                }
                else
                {
                    correctFolders.Add(serverFolder);
                }
            }

            correctFolders.AddRange(clientHasServerNotHas);
            correctFolders.AddRange(serverHasClientNotHas);
        }

        if (correctNotes.Count != 0)
        {
            _context.Notes.RemoveRange(_context.Notes.Where(x => x.UserId == userId));
            await _context.SaveChangesAsync();

            await _context.Notes.AddRangeAsync(correctNotes);
            await _context.SaveChangesAsync();
        }

        if (correctFolders.Count != 0)
        {
            _context.Folders.RemoveRange(_context.Folders.Where(x => x.UserId == userId));
            await _context.SaveChangesAsync();

            await _context.Folders.AddRangeAsync(correctFolders);
            await _context.SaveChangesAsync();
        }

        var profile = await _context.Profiles.FindAsync(userId);
        if (profile != null)
        {
            profile.LastSync = DateTime.Now;
            _context.Profiles.Update(profile);
            await _context.SaveChangesAsync();
        }

        await _hubContext.Clients.Group(userId.ToString()).SendAsync("UpdateData");
    }
}