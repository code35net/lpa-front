import React, { FC } from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';

// Register Font
Font.register({
    family: "Roboto",
    src:
        "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf"
});

// Create styles
const styles = StyleSheet.create({
    page: {
        fontFamily: "Roboto"
    },
    pageBackground: {
        position: 'relative',
        display: 'flex',
        height: 'auto',
        width: 'auto',
    },
    name: {
        position: 'absolute',
        top: '220px',
        textAlign: 'center',
        marginLeft: 'auto',
        marginRight:'auto',
        width: '100%'
    },
    identity: {
        position: 'absolute',
        top: '270px',
        textAlign: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '100%'
    },
    duration: {
        position: 'absolute',
        bottom: '134px',
        left: '234px',
        width: '200px'
    },
    validuntil: {
        position: 'absolute',
        bottom: '74px',
        left: '270px',
        width: '200px'
    },
    date: {
        position: 'absolute',
        bottom: '105px',
        left: '345px',
        width: '200px'
    },
    nameText: {

    },
    coursenameText: {
        position: 'absolute',
        bottom: '215px',
        width: '100%', flexWrap: "nowrap",
    }
});
type Props = {
    name: string
    date: string
    duration: string
    validuntil: string
    coursename: string
    identity: string
}
// Create Document Component
const MyDocument: FC<Props> = ({ name, date, duration, validuntil, coursename, identity }) => (
    <Document>
        <Page size="A4" orientation="landscape" style={styles.page}>
            <View style={{ flexDirection: 'row' }}>
                <Image src="http://localhost:3011/media/cert/yda_cert.png" style={styles.pageBackground} />
                <View style={styles.name}>
                    <Text style={{  fontSize: "35px", display: "flex", alignSelf: "center" }}>{name}</Text>
                </View>
                <View style={styles.identity}>
                    <Text style={{ fontSize: "35px", display: "flex", alignSelf: "center" }}>{identity}</Text>
                </View>
                <View style={styles.duration}>
                    <Text>{ duration }</Text>
                </View>
                <View style={styles.validuntil}>
                    <Text>{validuntil}</Text>
                </View>
                <View style={styles.date}>
                    <Text>{date}</Text>
                </View>
                <View wrap={false} style={styles.coursenameText}>
                    <Text style={{ width: "80%", alignSelf: "center" }}>{coursename}</Text>
                </View>
            </View>
        </Page>
    </Document>
)

export default MyDocument;