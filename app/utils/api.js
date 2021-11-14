const api = 'https://hacker-news.firebaseio.com/v0'
const json = '.json?print=pretty'

// Get top 50 stories.
export function getStories(type) {
    return fetch(`${api}/${type}stories${json}`)
        .then((res) => res.json())
        .then((ids) => {
            if (!ids) {
                throw new Error(`Something went wrong fetching ${type} posts. Please try again later.`)
            }

            return ids.slice(0, 50)
        })
        .then((ids) => Promise.all(ids.map(fetchItem)))
        .then((items) => removeDead(items))
        .then((items) => removeDeleted(items))

}


function fetchItem (id) {
    return fetch(`${api}/item/${id}${json}`)
        .then((res) => res.json())
}

function removeDead (items) {
    return items.filter(({ dead }) => dead === false || dead === undefined)
}

function removeDeleted (items) {
    return items.filter(({ deleted }) => deleted === false || deleted === undefined)
}
