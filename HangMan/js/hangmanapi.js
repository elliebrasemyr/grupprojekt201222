class Api {

    static async getInfo(){
        const santaResponse = await fetch('./word.json');
        const santa = await santaResponse.json();
       
        return{
            santa
        }
    }
}
 
export default Api;