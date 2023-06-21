const IncomeSchema = require("../models/IncomeModel");

exports.addIncome = async (req, res) => {
  const { title, amount, type, date, category, description } = req.body;

  const income = new IncomeSchema({
    title,
    amount,
    type,
    date,
    category,
    description,
  });
  try {
    //validations
    if (!title || !amount || !type || !date || !category || !description) {
      return res.status(400).json({ msg: "Please fill all fields" });
    }
    if (amount < 0 || amount === "number") {
      return res.status(400).json({ msg: "Please enter a valid amount" });
    }

    await income.save();
    res.status(200).json({ msg: "Income added successfully" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};


exports.getIncomes = async (req, res) => {
  try {
    const incomes = await IncomeSchema.find().sort({ createdAt: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteIncome = async (req, res) => {
  const { id } = req.params;
  IncomeSchema.findByIdAndDelete(id)
    .then((income) => {
      res.status(200).json({ message: "Income Deleted" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Server Error" });
    });
};
