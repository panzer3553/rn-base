var _ = require('underscore');

Parse.Cloud.afterSave("Emergency", function(request, response) {
    var emergencyData = request.object.toJSON();
    console.log(emergencyData);
    if (request.object.existed()) return;

    var query = new Parse.Query("Profile");
    query.get(emergencyData.profile.objectId).then(function(profile) {
        // add full profile data
        emergencyData.profile = profile;
        return reverseGeoToCity(emergencyData.location);
    }).then(function(locationInfo) {
        if (!locationInfo) {
            console.error('Invalid location info');
            return;
        }
        var profileQuery = new Parse.Query("Profile");
        profileQuery.containedIn("city", [locationInfo.administrative_area_level_1, locationInfo.locality, locationInfo.sublocality_level_1]);
        profileQuery.containedIn("userGroups", getGroupsFromEmergencyType(emergencyData.type));
        profileQuery.notEqualTo("objectId", emergencyData.profile.objectId);
        // profileQuery.containedIn("groups", getGroupsFromEmergencyType(emergencyData.type));
        // profileQuery.equalTo("country", locationInfo.country);

        var pushQuery = new Parse.Query(Parse.Installation);
        pushQuery.matchesQuery('profile', profileQuery);

        var pushMessageAddress = locationInfo && locationInfo.formatted_address ? locationInfo.formatted_address : emergencyData.location.longitude + ", " + emergencyData.location.latitude;

        Parse.Push.send({
            where: pushQuery,
            data: {
                alert: "There is an emergency at " + pushMessageAddress,
                title: "SmartSOS",
                badge: "Increment",
                sound: "cheering.caf",
                emergency: emergencyData
            }
        }, {
            success: function() {
                console.log("Push send successful")
            },
            error: function(error) {
                console.log("Send push fail " + error.message)
            }
        });
    });
});

function reverseGeoToCity(location) {
    // if (!location || !location.latitude || location.longitude) return null;

    return Parse.Cloud.httpRequest({
        url: 'https://maps.google.com/maps/api/geocode/json?latlng=' + location.latitude + ',' + location.longitude + '&sensor=false&language=en&key=AIzaSyAQOXqwDd0KdZNiNTw9Db51jdoZzwwWfeY'
    }).then(function(httpResponse) {
        return httpResponse.data.results[0];
    }).then(function(results) {
        return parsingAddress(results);
    });
}

function parsingAddress(result) {
    if (!result || !result.address_components) return;
    var components = {};
    components.formatted_address = result.formatted_address;
    _.each(result.address_components, function(component) {
        console.log(component.types[0] + ': ' + component.long_name);
        if (component.types[0] === 'administrative_area_level_1') {
            components.administrative_area_level_1 = component.long_name;
            // components.administrative_area_level_1_converted = slugStr(component.long_name);
        }

        if (component.types[0] === 'country') {
            components.country = component.short_name;
        }

        if (component.types[0] === 'locality') {
            // replace special charactors in Vietnamese locality.
            components.locality = component.long_name.replace(/(tp. )|(tt. )|(h. )/g, '');
            // components.locality_converted = slugStr(component.long_name);
        }

        if (component.types[0] == 'sublocality_level_1') {
            // replace special charactors in Vietnamese locality.
            components.sublocality_level_1 = component.long_name.replace(/(tp. )|(tt. )|(h. )/g, '');
            // components.sublocality_level_1_converted = slugStr(component.long_name);
        }

        if (component.types[0] === 'postal_code') {
            components.postcode = parseInt(component.long_name);
        }
    });

    console.log(components);
    return components;
}

// Define logic for sending push notification to correct groups here
function getGroupsFromEmergencyType(type) {
    switch (type) {
        case "fire":
            return ["fireStation", "fireGroup", "volunteer"];
        case "ambulance":
            return ["medicalUser", "medicalGroup", "volunteer"];
        case "police":
            return ["policeStation", "policeGroup", "volunteer"];
        default:
            return ["volunteer"];
    }
}

function slugStr(s) {
    if (_.isEmpty(s)) return s;

    var char_map = {
        "Đ": "D", "Ă": "A", "Â": "A", "Ê": "E", "Ô": "O", "Ơ": "O", "Ư": "U", "À": "A", "Ằ": "A", "Ầ": "A", "È": "E", "Ề": "E", "Ì": "I", "Ò": "O", "Ồ": "O", "Ờ": "O", "Ù": "U", "Ừ": "U", "Ỳ": "Y", "Á": "A", "Ắ": "A", "Ấ": "A", "É": "E", "Ế": "E", "Í": "I", "Ó": "O", "Ố": "O", "Ớ": "O", "Ú": "U", "Ứ": "U", "Ý": "Y", "Ả": "A", "Ẳ": "A", "Ẩ": "A", "Ẻ": "E", "Ể": "E", "Ỉ": "I", "Ỏ": "O", "Ổ": "O", "Ở": "O", "Ủ": "U", "Ử": "U", "Ỷ": "Y", "Ã": "A", "Ẵ": "A", "Ẫ": "A", "Ẽ": "E", "Ễ": "E", "Ĩ": "I", "Õ": "O", "Ỗ": "O", "Ỡ": "O", "Ũ": "U", "Ữ": "U", "Ỹ": "Y", "Ạ": "A", "Ặ": "A", "Ậ": "A", "Ẹ": "E", "Ệ": "E", "Ị": "I", "Ọ": "O", "Ộ": "O", "Ợ": "O", "Ụ": "U", "Ự": "U", "Ỵ": "Y",
        "đ": "d", "ă": "a", "â": "a", "ê": "e", "ô": "o", "ơ": "o", "ư": "u", "à": "a", "ằ": "a", "ầ": "a", "è": "e", "ề": "e", "ì": "i", "ò": "o", "ồ": "o", "ờ": "o", "ù": "u", "ừ": "u", "ỳ": "y", "á": "a", "ắ": "a", "ấ": "a", "é": "e", "ế": "e", "í": "i", "ó": "o", "ố": "o", "ớ": "o", "ú": "u", "ứ": "u", "ý": "y", "ả": "a", "ẳ": "a", "ẩ": "a", "ẻ": "e", "ể": "e", "ỉ": "i", "ỏ": "o", "ổ": "o", "ở": "o", "ủ": "u", "ử": "u", "ỷ": "y", "ã": "a", "ẵ": "a", "ẫ": "a", "ẽ": "e", "ễ": "e", "ĩ": "i", "õ": "o", "ỗ": "o", "ỡ": "o", "ũ": "u", "ữ": "u", "ỹ": "y", "ạ": "a", "ặ": "a", "ậ": "a", "ẹ": "e", "ệ": "e", "ị": "i", "ọ": "o", "ộ": "o", "ợ": "o", "ụ": "u", "ự": "u", "ỵ": "y"
    };

    for (var c in char_map) {
        s = s.replace(RegExp(c, 'g'), char_map[c]);
    }

    return s;
}

