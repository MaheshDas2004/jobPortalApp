const mongoose=require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://maheshdas23_db_user:HuvQATzvzp24JJsN@hirematrixcluster.ladtvjt.mongodb.net/?appName=HireMatrixCluster');
    console.log("MongoDB Connected");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
