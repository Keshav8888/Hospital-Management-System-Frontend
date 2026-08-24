export const getDashboardGreeting = () => {

    const hour = new Date().getHours();

    if (hour < 12) {
        return "Good Morning";
    }

    if (hour < 17) {
        return "Good Afternoon";
    }

    return "Good Evening";
};


export const getLoggedInFirstName = () => {

    return (
        localStorage.getItem("firstName") ||
        "User"
    );
};