const LocalStrategy = require('passport');
const bycript = require('bcryptjs');

function initialize(passport, getUserByEmail){
    const authenticateUser = (email, password, done) =>{
        const user = getUserByEmail(email)
        if (user == null){
            return done(null, false, { message: 'Não tem email' })
        }
        try{
            if(await bycript.compare(password, user.password)){
                return done(null, user)
            }else{
                return done(null, false, { message: 'Senha errado' });
            }
        }
        catch(e){
            return done(e)
        }
    }

    passport.use(new LocalStrategy({ unsernameField: email}),
    authenticateUser)
    passport.serializeUser((user, done) => { })
    passport.deserializeUser((user, done) => { })
}

modules.exports = initialize;