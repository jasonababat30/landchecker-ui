const getPropertyIcon = (propertyType: string) => {
    switch (propertyType) {
        case "house":
            return "🏡";
        case "apartment":
            return "🏢";
        case "townhouse":
            return "🏘️";
    }    
}

export default getPropertyIcon;
