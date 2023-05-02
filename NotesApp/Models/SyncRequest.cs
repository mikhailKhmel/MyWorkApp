using NotesApp.Models.DbModels;

namespace NotesApp.Models;

public class SyncRequest
{
    public string connectionId { get; set; }
    public Profile Profile { get; set; }
    public List<Folder> folders { get; set; }
    public List<Note> notes { get; set; }
}