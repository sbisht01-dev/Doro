import { getDatabase, ref, onValue, push } from "firebase/database"
import app from "../firebase"
import { memo } from "react";
import { useEffect, useState } from "react"

function Tag() {
    const database = getDatabase(app);
    const [tag, setTag] = useState("");
    let userID = window.localStorage.getItem("uid")
    // console.log(userID)
    function genTagColor() {
        const hue = Math.floor(Math.random() * 365);
        const color = `hsl(${hue}, 40%, 85%)`;
        return color
    }

    const [ntag, setNtag] = useState(0);
    useEffect(() => {
        let tagArray = [];
        const dbref = ref(database, `/Doro/${userID}/tags/`);

        onValue(dbref, (snapshot) => {
            let data = snapshot.val();
            if (data) {
                setNtag(Object.keys(data).length)
                tagArray = Object.keys(data).map((key) => data[key]);

                tagArray.forEach((element) => {
                    const dataTag = document.createElement('div');
                    if (!document.getElementById(`${element.tagName}`)) {
                        dataTag.id = `${element.tagName}`;
                        dataTag.textContent = `${element.tagName}`;
                        document.getElementById("available-tag").appendChild(dataTag);
                        document.getElementById(`${element.tagName}`).style.backgroundColor = element.tagColor;
                    } else {
                        console.log("Element already exist");
                    }
                });
            }
        });
    }, [database, userID]);
console.log(ntag)

    const submitTag = () => {
        const color = genTagColor();
        const dbRef = ref(database, `/Doro/${userID}/tags/`)
        const tagData = {
            tagName: tag,
            tagColor: color
        }
        if (tag && ntag<5) {
            push(dbRef, tagData)
                .then(() => {
                    console.log("Tag added");
                    setTag("");
                })
                .catch((error) => {
                    console.log("Error adding tag:", error);
                });
        } else {
            console.log("Reached Max Value or Provide Non empty Tag")
        }
    }



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

            <div className="tag-list" id="available-tag">

            </div>
        </>
    )
}

export default memo(Tag)