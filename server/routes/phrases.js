import { Router } from "express";
import Phrase from "../models/Phrase";

const router = Router();

router.get("/", (req, res) => {
  Phrase.find()
    .then((data) => {
      res.json(data);
    })
    .catch((e) => {
      res.status(500).json({ message: "Произошла ошибка" });
    });
});

router.post("/", (req, res) => {
  new Phrase(req.body)
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((e) => {
      res.status(500).json({ message: "Произошла ошибка" });
    });
});

router.delete("/", (req, res) => {
  Phrase.findOneAndDelete({ _id: req.body._id })
    .then((data) => {
      if (!data) return res.status("404").json({ message: "Фраза уже удален" });
      res.json(data);
    })
    .catch((e) => {
      res.status(500).json({ message: "Произошла ошибка" });
    });
});

export default router;
