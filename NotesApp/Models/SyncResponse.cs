using NotesApp.Models.DbModels;

namespace NotesApp.Models;

public class SyncResponse
{
    public Profile profile { get; set; }
    public List<Folder> folders { get; set; }
    public List<Note> notes { get; set; }
}