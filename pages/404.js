import Head from 'next/head';
import Layout from '../components/layout'

export default function InvalidPage() {

    return (
        <Layout>
            <Head>
                <title>Page Not Found</title>
            </Head>
            <section>
                <p>Invalid Page</p>
                <p>Page does not exist</p>
            </section>
        </Layout>
    )
};