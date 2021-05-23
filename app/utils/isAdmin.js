'use strict';

const isAdmin = {

    isAdmin(scope)
    {
        if (scope == 'admin')
        {
            return true;
        }
        return false;
    }
};

module.exports = isAdmin;