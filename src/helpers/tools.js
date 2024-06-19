export const getInitials = (username) => {
    return username
        .split(' ')                    // Split the username by spaces into an array of words
        .map(word => word[0].toUpperCase()) // Map each word to its first letter and convert to uppercase
        .join('');                     // Join the array of letters into a single string
};