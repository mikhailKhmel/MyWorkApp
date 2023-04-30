using Microsoft.AspNetCore.SignalR;

namespace NotesApp.Hubs;

public class MyHub : Hub
{


    public async void Enter(string connectionId, string userId)
    {
        await Groups.AddToGroupAsync(connectionId, userId);
        
        await Clients.Group(userId).SendAsync("UpdateData");
    }
}