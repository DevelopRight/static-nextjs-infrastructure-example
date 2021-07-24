import Head from 'next/head';
import Layout from '../components/layout'

export default function UnauthorisedPage() {

    return (
        <Layout>
            <Head>
                <title>403 - Unauthorised Access</title>
            </Head>
            <section>
                <p>Unauthorised Access to this Website</p>
            </section>
        </Layout>
    )
};