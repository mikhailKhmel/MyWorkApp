using Microsoft.EntityFrameworkCore;
using NotesApp.Models;

namespace NotesApp.Database;

public class MyDbContext : DbContext
{
    public MyDbContext(DbContextOptions<MyDbContext> options) : base(options)
    {
    }
    
    public DbSet<Profile> Profiles { get; set; }
    public DbSet<Note> Notes { get; set; }
    public DbSet<Folder> Folders { get; set; }
}