using Microsoft.EntityFrameworkCore;

namespace StudentManagementSystem.Data;

public class ApplicationDBContext : DbContext
{
    public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
    {
    }
    public DbSet<Models.Student> Students { get; set; }


}
