var config = {};
/** * Database and collections ***/
config.db_url = 'mongodb://localhost:27017/';
config.database = 'websurvey';
config.userCollection = "users";
config.pollsCollection = "polls";
config.inviteCollection = "invite";

/** user token authorization parameters **/
config.user_token = {
    issuer: 'http://localhost:8443',
    audience: 'http://localhost:8443'
};
/** * secret key for user authenticate ***/
config.secret_key = 'thebestpowerfulwebsurvey';

/** * JWT authorization setting ***/
config.issuer = 'http://auth-dev.jpos.io';
config.jwksUri = 'http://auth-dev.jpos.io/.well-known/openid-configuration/jwks';

/** * Get new access token ***/
config.token_endpoint = 'http://auth-dev.jpos.io/connect/token';
config.params_to_get_new_access_token = {
    'grant_type': 'password',
    'username': 'alice',
    'password': 'Pass123$',
    'scope': 'POS.Hub.Api',
    'client_id': 'POSHubApi.User',
    'client_secret': 'P@ssw0rd!'
};

/** * Upload file size ***/
config.upload_file_max_size = 5 * 1024 * 1024;

/** * Result code of API response ***/
config.result_code = {
    /** * User create ***/
    EMAIL_UNDEFINED: 101, // email parameter is not defined
    PASSWORD_UNDEFINED: 102, // password parameter is not defined
    NAME_UNDEFINED: 103, // name parameter is not defined
    CELLNUMBER_UNDEFINED: 104, // phone number is not defined
    EMAIL_ALREADY_EXIST: 105, // a user with this email already exist
    USER_CREATED_SUCCESS: 106, // a user successfully created
    EXPERTON_UNDEFINED: 107,
    YEARS_UNDEFINED: 108,

    /** * User login ***/
    LOGIN_EMAIL_INVALID: 157, // email paramater is not defined
    LOGIN_PASSWORD_INVALID: 158, // password parameter is not defined
    LOGIN_GET_TOKEN_ERROR: 159, // error occurs when get token
    LOGIN_SUCCESS: 160, // user successfully logged in
    INVALID_USER_TOKEN: 161, // user token invalid
    USER_TOKEN_NO_PROVIDED: 162, // must set user token

    /** * Token authorization ***/
    NEED_AUTHORIZATION_HEADER: 210, // need to set authorization in header
    EXPECTED_BEARER_TOKEN: 211, // expected bearer token for authorization
    TOKEN_AUTHORIZATION_FAILED: 212, // token authorization failed

    // /** * Order validate check and save ***/
    // ORDER_EMPTY_OBJECT: 310, // orer accountId undefined
    // ORDER_ACCOUNTID_NOT_MATCHED: 311, // order accountId not matched
    // ORDER_VALIDATE_FAILED: 313, // can't validate order
    // ORDER_VALIDATE_SUCCESS: 314, // order validated successfully
    // ORDER_ALREADY_EXIST: 315, // order already exist
    // ORDER_SAVED_SUCCESS: 316, // order successfully created
    // ORDERS_GET_BY_USERID: 317, // get orders by userId(user email address)
    // NO_ORDERS_MATCH_USERID: 381, // no orders matched userId
    // ORDER_GET_STATUS_UNDEFINED: 382, // status undefined when get orders of status
    // NO_PENDING_ORDERS: 383, // no orders of pending
    // ORDERS_OF_PENGIND: 384, //  get orders of pending
    // NO_SUCH_STATUS: 385, // no such status
    // ORDERS_GET_BY_ORDERID: 386, // get orders by orderId
    // NO_ORDERS_BY_ORDERID: 387, // no orders matched orderId

    // /** * File upload and download ***/
    // FILE_UPLOAD_SUCCESS: 417, // file successfully uploaded
    // FILE_DOWNLOAD_SUCCESS: 418, // file successfully download
    // NO_SUCH_FILE: 419, // no such file in directory
    // FILE_LIST_SUCCESS: 420, // successfully get list of files
    // NO_SELECTED_UPLOAD_FILE: 421, // no selected file to upload
    // ERROR_IN_FILE: 422, // occurs error

    // /** * query and save products ***/
    // QUERY_SUCCESS: 511, // executed mongo query successfully
    // QUERY_PARAMETER_REQUIRE: 512, // require some parameters
    // SAVE_PRODUCT_SUCCESS: 513, // save products successfully
    // QUERY_EXECUTION_ERROR: 514 // error occurs when mongo query

    /* Poll create and update code*/
    /*Detect Undefined Code*/
    TITLE_UNDEFINED: 300, //
    DESCRIPTIOIN_UNDEFINED: 301, //
    ANSWERTYPE_UNDEFINED: 302, //
    OPTION1_UNDEFINED: 303,
    OPTION2_UNDEFINED: 304,
    DATECREATED_UNDEFIND: 305,
    POLLID_UNDEFINED: 306,
    USERID_UNDEFINED: 307,
    ANSWER_UNDEFINED: 308,
    DATE_UNDEFINED: 309,
    TOKEN_UNDEFINED: 310,
    POLL_STATUS_UNDEFINED: 311,
    POLL_USERID_UNDEFINED: 312,
    INVITE_STATUS_UNDEFINED: 313,
    USER_EMAIL_UNDEFINED: 314,

    /*Response Code*/
    POLL_CREATE_SUCCESSFULLY: 411,
    POLL_UPDATED_SUCCESSFULLY: 419,
    POLL_DELETED_SUCCESSFULLY: 420,
    GET_USER_POLL_SUCCESS: 414,
    GET_TOTAL_POLL_SUCCESS: 416,

    POLL_ALREADY_EXIST: 412,
    POLL_DOES_NOT_EXIST: 413,

    POLL_STATUS_CAHNGE_SUCCESS: 415,

    POLLRES_ADDED_SUCCESSFULLY: 417,
    POLLRES_UPDATED_SUCCESSFULLY: 418,

    //INVITATION
    INVTIED_SUCCESSFULL: 500,
    ALREADY_ACCEPTED: 501,
    ALREADY_REJECTED: 502,
    ALREADY_PEDING: 503,
    INVITE_NOT_EXISTED: 504,
    INVITE_ACCEPTED: 505,
    INVITE_REJECTED: 506,
    GET_INVITATION_SUCCESSFULLY: 507,
    GET_RECEPTION_SUCCESSFULLY: 508,

    NOTHING_HAPPEND: 999







};

/** * For displaying result of API response ***/
function _displayResults(returnCode, data, result) {
    if (result === undefined) {
        result = false;
    }
    return {
        'result': result,
        'result_code': returnCode,
        'data': data
    };
}
config._displayResults = _displayResults;

module.exports = config;