import React from 'react';
import { FunctionComponent } from 'react';
import { ReactElement } from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Search from '../components/search';

const IndexPage: FunctionComponent = (): ReactElement => (
    <Layout>
        <SEO title="Home" />
        <Search />
    </Layout>
);

export default IndexPage;
