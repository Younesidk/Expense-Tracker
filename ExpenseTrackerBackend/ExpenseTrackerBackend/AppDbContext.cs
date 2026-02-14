using Microsoft.EntityFrameworkCore;

namespace ExpenseTrackerBackend
{
    public class AppDbContext : DbContext
    {
        public DbSet<Transaction> Transactions { get; set; } = null!;

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }
    }
}