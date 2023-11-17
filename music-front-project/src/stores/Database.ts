import { defineStore } from 'pinia'
import { useUserStore } from '../stores/Auth'
import { getDatabase, ref, set, push, get, child, onChildAdded, onChildChanged, onChildRemoved, orderByChild, update, query, equalTo, onValue, startAt } from "firebase/database";
import Swal from 'sweetalert2'

export interface Track {
    id?: String,
    name?: String,
    author?: String,
    gender?: String,
    imgURL?: String
}

const dataBaseStore = defineStore('dataBaseStore', {

    actions: {

        pushTrack(track: Track, callback: any) {
            const db = getDatabase();
            const tracksList = ref(db, 'tracks');
            const newTrackRef = push(tracksList);
            set(newTrackRef, track)
                .then(response => {
                    Swal.fire("Track created!");
                    callback(response)
                })
                .catch(error => Swal.fire({ title: 'Error' + error, icon: 'error' }));
        },
        pushTrackLikeUser(track: Track, callback?: any) {
            const userStore = useUserStore()
            const db = getDatabase()
            const tracksList = ref(db, `favorites-tracks/${userStore.userData.id}`);
            const newTrackRef = push(tracksList);
            set(newTrackRef, track)
                .then(response => {
                    Swal.fire("cool... you got it!");
                    if (callback) callback(response)
                })
                .catch(error => Swal.fire({ title: 'Error' + error, icon: 'error' }));
        },
        updateTrack(track: Track, callback: any) {
            const db = getDatabase();
            const trackChild = ref(db, `tracks/${track.id}`);
            update(trackChild, track)
                .then(response => {
                    Swal.fire("Track updated!");
                    callback(response)
                })
                .catch(error => Swal.fire({ title: 'Error' + error, icon: 'error' }));
        },
        filter(filter: string) {
            const db = getDatabase();
            console.log(filter)
            const reference = child(ref(db), 'tracks')
            const result = query(reference)
            onChildAdded(result, (data) => {
                console.log(data.val())
            })
        },
        readListMusic(track: Track, callback: any) {
            const db = getDatabase();
            const reference = child(ref(db), 'tracks')
            const result = query(reference, orderByChild('author'))
            onChildAdded(result, (data) => {
                callback(data)
            });
        },
        readListFavorite(track: Track, callback: any) {
            const db = getDatabase()
            const userStore = useUserStore()
            const commentsRef = ref(db, `favorites-tracks/${userStore.userData.id}`);
            const result = query(commentsRef, orderByChild('name'))
            onChildAdded(result, (data) => {
                callback(data)
            });
        }
    }

})


export { dataBaseStore };