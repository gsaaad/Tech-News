const User = require("./User");
const Post = require("./Post");

// model index.js -> create associations
User.hasMany(Post, {
  foreignKeyConstraint: "user_id",
});

Post.belongsTo(User, {
  foreignKeyConstraint: "user_id",
});

module.exports = { User, Post };
