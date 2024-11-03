import { getDatabase, ref, onValue, push } from "firebase/database"
import app from "../../firebase"
import { memo } from "react";
import { useEffect, useState } from "react"

function Tag() {
    const database = getDatabase(app);
    const [tag, setTag] = useState("");
    let userID = window.localStorage.getItem("uid")
    // console.log(userID)
    function genTagColor() {
        const hue = Math.floor(Math.random() * 365);
        const color = `hsl(${hue}, 100%, 50%)`;
        return color
    }

    const submitTag = () => {
        console.log("Clicked")
        const color = genTagColor();
        const dbRef = ref(database, `/Doro/${userID}/tags/`)
        const tagData = {
            tagName: tag,
            tagColor: color
        }
        push(dbRef, tagData)
            .then(() => {
                console.log("Tag added");
                setTag("");
            })
            .catch((error) => {
                console.log("Error adding tag:", error);
            });
    }
    useEffect(() => {
        const dbref = ref(database, `/Doro/${userID}/tags/`)
        onValue(dbref, (snapshot) => {
            let data = snapshot.val()
            console.log(data)
        })

    })

    
    return (
        <>
            <div>
                <input
                    id="tag-input"
                    type="text"
                    name="tag"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)} />
                <button id="submit" onClick={submitTag}>Add</button>
            </div>
        </>
    )
}

export default memo(Tag)