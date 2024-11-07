import { getDatabase, ref, onValue, set } from "firebase/database"
import app from "../firebase"
import { memo } from "react";
import { useEffect, useState } from "react"
import PropTypes from "prop-types";

function Tag(props) {
    const database = getDatabase(app);
    const [tag, setTag] = useState("");
    const timer = props.timerActive;
    const activeTag = props.activeTag;
    const [activeTagID, setActiveTagID] = useState("");
    let userID = window.localStorage.getItem("uid");

    /**
     * Generates a random color in HSL format.
     * 
     * @returns {string} A string representing the color in HSL format.
     */
    function genTagColor() {
        const hue = Math.floor(Math.random() * 365);
        const color = `hsl(${hue}, 40%, 85%)`;
        return color;
    }

    const [ntag, setNtag] = useState(0);

    useEffect(() => {
        let tagArray = [];
        const dbref = ref(database, `/Doro/${userID}/tags/`);

        onValue(dbref, (snapshot) => {
            let data = snapshot.val();
            if (data) {
                setNtag(Object.keys(data).length);
                tagArray = Object.keys(data).map((key) => data[key]);

                tagArray.forEach((element) => {
                    const dataTag = document.createElement('div');
                    if (!document.getElementById(`${element.tagName}`)) {
                        dataTag.id = `${element.tagName}`;
                        dataTag.textContent = `${element.tagName}`;
                        document.getElementById("available-tag").appendChild(dataTag);
                        document.getElementById(`${element.tagName}`).style.backgroundColor = element.tagColor;
                    } else {
                        console.log("Element already exists");
                    }
                    getAllTagColors();
                });
            }
        });
    }, [database, userID]);

    /**
     * Sends the currently active tag ID to the parent component for time update.
     */
    useEffect(() => {
        activeTag(activeTagID);
    }, [activeTag, activeTagID]);

    /**
     * Submits a new tag to the Firebase database.
     * 
     * Generates a random color for the tag and checks if the tag name is 
     * not empty and if the limit of 5 tags has not been reached.
     */
    const submitTag = () => {
        const color = genTagColor();
        const dbRef = ref(database, `/Doro/${userID}/tags/${tag}`);
        const tagData = {
            tagName: tag,
            tagColor: color,
            tagTotalDuration: 0
        };
        if (tag && ntag < 5) {
            set(dbRef, tagData)
                .then(() => {
                    console.log("Tag added");
                    setTag("");
                })
                .catch((error) => {
                    console.log("Error adding tag:", error);
                });
        } else {
            console.log("Reached Max Value or Provide Non-empty Tag");
        }
    }

    /**
     * Retrieves all tag colors and sets up click event listeners on each tag.
     * 
     * When a tag is clicked, it changes the background color of the document 
     * body to the tag's color and updates the active tag ID state.
     */
    function getAllTagColors() {
        const tagList = document.getElementById("available-tag");
        const tagDivs = tagList.querySelectorAll("div");
        const colors = [];

        tagDivs.forEach(div => {
            const color = window.getComputedStyle(div).backgroundColor;
            div.addEventListener("click", function () {
                document.body.style.backgroundColor = color;
                setActiveTagID(div.id);
            });
        });
        return colors;
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

            {/* tags are dynamically added and called from  database */}
            <div className="tag-list" id="available-tag">

            </div>
        </>
    )
}

Tag.propTypes = {
    timerActive: PropTypes.bool.isRequired,
    activeTag: PropTypes.bool.isRequired
}

export default memo(Tag)