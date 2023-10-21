export default class GenericFunctions{
    static genericRandomNumber(maxNumber = 1000000000){
        return Math.round(maxNumber * Math.random());
    }
}