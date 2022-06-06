class CecTradingMonth {
    /**
    * Schema for a certain type of certificate
    * @param {String} smartmeterid 
    * @param {Object} days 
    */
    constructor( smartmeterId, days){
        this.smartmeterId = smartmeterId;
        this.days = days;
        this.dataType = "cecTradingMonth"
    }
    
    
    
    /**
    * Instantiate object from json argument. 
    * @param {json} data json data of a Profile instance 
    * @returns {CecTradingMonth} instantiated University Profile object. 
    */
    static deserialize(data) {
        return new CecTradingMonth(data.smartmeterId, data.days);
    }
    
}

module.exports = CecTradingMonth; 