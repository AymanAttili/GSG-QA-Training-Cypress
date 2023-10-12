export default class genericFunctions{
    static genericRandomNumber(maxNumber = 1000000000){
        return Math.round(maxNumber * Math.random());
    }
}