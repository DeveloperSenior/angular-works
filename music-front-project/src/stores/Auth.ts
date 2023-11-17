import { defineStore } from 'pinia'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithPopup
} from "firebase/auth";
import router from '../router/index';
import {auth} from '../../firebase';
import Swal from 'sweetalert2'


export interface User{
    id?:String,
    providerId?:String,
    email?:String,
    name?:String,
    photoURL?:String
}



const useUserStore = defineStore('userStore', {
    state: () => ({
        userData: {} as User,
        isLoginUser: false
    }),
    getters: {},
    actions: {
        logIn(email: any, pass: any) {
            signInWithEmailAndPassword(auth, email, pass)
                .then((userCredential: any) => {
                    // Signed in 
                    this.userData = { email: userCredential.email, id: userCredential.uid} as User;
                    this.isLoginUser = true;
                    router.push("/");
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    Swal.fire({ title: 'Error iniciando sesion: ' + errorCode + ' ' + errorMessage + error, icon: 'error' })
                });
        },
        loginWithGoogle(){
            const provider = new GoogleAuthProvider();
            signInWithPopup(auth, provider)
            .then((userCredential) =>{
                this.userData = { email: userCredential.user.email, id: userCredential.user.uid, name: userCredential.user.displayName, photoURL: userCredential.user.photoURL} as User;
                this.isLoginUser = true;
                router.push("/");
            })
        },
        loginWithGithub(){
            const provider = new GithubAuthProvider();
            signInWithPopup(auth, provider)
              .then((result) => {
                // This gives you a GitHub Access Token. You can use it to access the GitHub API.
                const credential = GithubAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;
            
                // The signed-in user info.
                const userCredential = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                this.userData = { email: userCredential.email, id: userCredential.uid, name: userCredential.displayName, photoURL: userCredential.photoURL} as User;
                this.isLoginUser = true;
                router.push("/");
                // ...
              }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GithubAuthProvider.credentialFromError(error);
                // ...
                Swal.fire({ title: errorMessage + error, icon: 'error' })

              });
        },
        createUser(email: string,password: string){
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                this.userData = { email: user.email, id: user.uid} as User;
                this.isLoginUser = true;
                router.push("/");
                // ...
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                Swal.fire({ title: errorMessage + error, icon: 'error' })

                // ..
              });
        },
        logOut() {
            signOut(auth).then(() => {
                // Sign-out successful.
                this.userData = {} as User;
                this.isLoginUser = false;
                router.push("/home");
            }).catch((error: any) => {
                // An error happened.
                Swal.fire({ title: 'Error cerrando sesion: ' + error + error, icon: 'error' })

            });
        },
        getUserSession() {
            return new Promise<any>((resolve, reject) => {
                onAuthStateChanged(auth, user => {

                    if (user) {
                        this.userData = { email: user.email, id: user.uid,providerId:user.providerId, name: user.displayName, photoURL: user.photoURL} as User;

                    } else {
                        this.userData = {};
                    }

                    resolve(this.userData);
                }, e => reject(e));
            });
        }
    }
});

export { useUserStore };