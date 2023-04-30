using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NotesApp.Database;

namespace NotesApp.Controllers;

[ApiController]
[Route("[controller]")]
public class TokenController : ControllerBase
{
    private readonly MyDbContext _context;

    public TokenController(MyDbContext myDbContext)
    {
        _context = myDbContext;
    }


    [HttpPost]
    public async Task<IActionResult> Post([FromBody] string token)
    {
        var profile = await _context.Profiles.FirstOrDefaultAsync(x => x.Token == token);
        if (profile != null)
        {
            return Ok(profile);
        }

        return NotFound(new {message = "no"});
    }
}