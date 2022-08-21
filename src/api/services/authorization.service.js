export class Autorization {
    static set = (bearer) => localStorage.setItem('Authorization', bearer)
    static get = () => localStorage.getItem('Authorization')
    static remove = () => localStorage.removeItem('Authorization')
}
