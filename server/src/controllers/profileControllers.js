const db = require("../db");

exports.createProfile = async (req, res) => {
  const { name, pin, type, yearEnd, shares, paidUp, nominal } = req.body;
  kraPin = pin.toUpperCase();
  user_id = req.user.id;

  // Check is business is existing
  const findPIN = {
    text: "SELECT * FROM business_profile WHERE kra_pin = $1",
    values: [kraPin],
  };

  const saveProfile = {
    text: "INSERT INTO business_profile (biz_name,kra_pin,biz_type,year_end,shares,paid_shares,nominal_val,created_by) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",
    values: [name, pin, type, yearEnd, shares, paidUp, nominal, user_id],
  };

  try {
    const userPIN = await db.query(findPIN);

    if (userPIN.rows.length > 0) {
      return res.status(401).json("Profile for the PIN already exists");
    }

    let newProfile = await db.query(saveProfile);

    return res.json(newProfile.rows);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};
