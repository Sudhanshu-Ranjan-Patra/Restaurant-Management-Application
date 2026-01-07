const resisterController = async (req,res) => {
    try {
        const {username, email, password, phone, address, usertype} = req.body;
        //validation
        if(!username || !email || !password || !phone || !address || !usertype){
            return res.status(500).send({
                success: false,
                message: 'Please Provide All Fields'
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message: 'Error In Resister API',
            error
        })
    }
}

module.exports = { resisterController };