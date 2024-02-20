const {unAuthorizedError}=require('../errors')

/**
    - if a user is accessing their record with id
    - they might get record of other record if they have id
    - so we need to properly check for permissions properly
    - only admin is able to access each user with id
    - other users will only be able to access their own record

*/
const checkPermissions=(requestUser,resourceUserId)=>{
    if(requestUser.role=='admin') return true;
    if(requestUser.userId!==resourceUserId ){
        throw new unAuthorizedError('Your are not authorized to access this user');
    }
    console.log('matched');
    return true;
}

module.exports=checkPermissions;