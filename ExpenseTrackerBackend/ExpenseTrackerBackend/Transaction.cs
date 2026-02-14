namespace ExpenseTrackerBackend
{
    public class Transaction
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public double Amount { get; set; }
        public string Type { get; set; } = null!;
        public DateOnly Date { get; set; }

        public Transaction() { }

        public Transaction(int id,string title, double amount, string type, DateOnly date)
        {
            Id = id;
            Title = title;
            Amount = amount;
            Type = type;
            Date = date;
        }
    }
}
