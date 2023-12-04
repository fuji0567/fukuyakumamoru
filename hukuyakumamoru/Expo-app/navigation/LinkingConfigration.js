import * as Linking from "expo-linking";
export default {
    prefixes: [Linking.createURL("/")],
    config: {
        screens: {
            Root: {
                screens: {
                    TabOne: {
                        screens: {
                            TabOneScreen: "one",
                        },
                    },
                    TabTwo: {
                        screens: {
                            TopTabOne: {
                                screens: {
                                    TopTabOneScreen: "TopTabOne"
                                },
                            },
                            TopTabTwo: {
                                screens: {
                                    TopTabTwoScreen: "TopTabTwo"
                                }
                            }
                        }
                    },
                    TabThree: {
                        screens: {
                            TabOneScreen: "three",
                        },
                    },
                },
            },
            NotFound: "*",
        }
    },
};