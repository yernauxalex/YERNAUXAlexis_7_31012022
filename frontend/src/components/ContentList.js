// post récupérés dans la DB via l'API, à voir si c'est possible
const postList = [
    'Post1',
    'Post2',
    'Post3'
]

// ul/li pour l'exemple, index devra être remplacé par l'id du post présent dans la DB
// Système de carte préférable
function ContentList() {
    return (
        <ul>
            {postList.map((post, index) => (
                <li key={`${post}-${index}`}>{ post }</li>
            ))}
        </ul>
    )
}


export default ContentList;