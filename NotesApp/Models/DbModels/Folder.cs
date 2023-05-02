namespace NotesApp.Models.DbModels;

public class Folder
{
    public Guid Id { get; set; }

    public string? Title { get; set; }
    public Guid UserId { get; set; }
    public Guid? Parent { get; set; }
    public DateTime LastUpdate { get; set; }
    public bool IsDelete { get; set; }
}