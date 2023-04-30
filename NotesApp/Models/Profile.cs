namespace NotesApp.Models;

public class Profile
{
    public Guid Id { get; set; }
    
    public string? Token { get; set; }
    
    public bool IsActive { get; set; }
    
    public DateTime LastSync { get; set; }
}