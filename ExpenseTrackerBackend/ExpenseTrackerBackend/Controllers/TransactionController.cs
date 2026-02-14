using ExpenseTrackerBackend;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;


namespace ExpenseTrackerBackend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TransactionController : ControllerBase
    {
        private readonly AppDbContext _context;
        public TransactionController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetTransactions()
        {
            return Ok(_context.Transactions);
        }

        [HttpPost]
        public IActionResult PostTransaction([FromBody] Transaction transaction)
        {
            if (transaction == null) 
                return NotFound();

            _context.Transactions.Add(transaction);
            _context.SaveChanges();
            return Ok(transaction);
        }

        [HttpPut("{id}")]
        public IActionResult EditTransaction([FromRoute] int id, [FromBody] Transaction UpdatedTransaction)
        {
            var Transaction = _context.Transactions.FirstOrDefault(T => T.Id == id);
            if (UpdatedTransaction == null || Transaction == null)
                return NotFound();


            Transaction.Title = UpdatedTransaction.Title;
            Transaction.Amount = UpdatedTransaction.Amount;
            Transaction.Date = UpdatedTransaction.Date;
            _context.SaveChanges();
            return Ok(Transaction);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTransaction([FromRoute] int id)
        {
            var Transaction = _context.Transactions.FirstOrDefault(T => T.Id == id);
            if (Transaction == null)
                return NotFound();

            _context.Transactions.Remove(Transaction);
            _context.SaveChanges();
            return Ok(Transaction);
        }
    }
}
