namespace NotesApp.Models;

public class SyncData
{
    public Guid userId { get; set; }
    public List<Folder> folders { get; set; }
    public List<Note> notes { get; set; }
}