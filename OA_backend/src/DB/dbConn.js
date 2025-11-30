import mongoose from "mongoose"

const dbConn = async ()=> {
    try {
        const conn = await mongoose.connect(process.env.MONGOCONN_URL)
        console.log(`Db COnnected Successfully ${conn.connection.host}`)
    } catch (error) {
        console.log("Db Connection Failed", error)
        process.exit(1)
    }
}

export default dbConn;