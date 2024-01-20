const Note = require('./note')
const Blog = require('./blog')
const User = require('./user')
const Team = require('./team')
const Membership = require('./membership')
const UserNotes = require('./user_notes')
const ReadingList = require('./readinglist')
User.hasMany(Note)
User.hasMany(Blog)
Note.belongsTo(User)
Blog.belongsTo(User)
User.belongsToMany(Team, { through: Membership })
Team.belongsToMany(User, { through: Membership })
User.belongsToMany(Note, { through: UserNotes , as : 'marked_notes'})
Note.belongsToMany(User, { through: UserNotes, as : 'users_marked' })
User.belongsToMany(Blog, { through: ReadingList, as : 'blog_read_added' })
Blog.belongsToMany(User, { through: ReadingList, as : 'listed_users' })
module.exports = {
  Note,
  Blog,
  User,
  Team,
  Membership,
  UserNotes,
  ReadingList
}