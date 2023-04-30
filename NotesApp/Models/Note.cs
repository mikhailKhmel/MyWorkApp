using System.Text.Json;

namespace NotesApp.Models;

public class Note
{
    public Guid Id { get; set; }

    public string? Title { get; set; }

    public Content? Content { get; set; }

    public Guid UserId { get; set; }

    public DateTime LastUpdate { get; set; }

    public Guid? Parent { get; set; }

    public bool IsDelete { get; set; }
}

public class Content
{
    public Guid? Id { get; set; }
    public long Time { get; set; }
    public List<Block>? Blocks { get; set; }
    public string? Version { get; set; }
}

public class Block
{
    public string? Id { get; set; }
    public string? Type { get; set; }
    public JsonDocument? Data { get; set; }
}