import useRouter from "express"

const router = useRouter()

router.get('/health', (req, res) => {
     res.status(200).json({
        status: "ok",
        uptime: process.uptime(),
        time: new Date(),
    });
})

export default router