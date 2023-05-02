using System.Text.Json;

namespace NotesApp.Models.DbModels;

public class Note
{
    public Guid Id { get; set; }

    public string? Title { get; set; }

    public JsonDocument? Content { get; set; }

    public Guid UserId { get; set; }

    public DateTime LastUpdate { get; set; }

    public string? Parent { get; set; }

    public bool IsDelete { get; set; }
}