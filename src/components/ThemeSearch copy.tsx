import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Container from './Container';
import Categories from './Categories/Categories';
import EmptyState from './EmptyState';
import PaginationButtons from './PaginationButtons';
import mockData from '../lib/mockdata.json';
// import getProducts, { ProductsParams } from "../actions/getProducts";
// import Container from "@/components/Container";
// import EmptyState from "@/components/EmptyState";
// import ProductCard from "@/components/products/ProductCard";
// import FloatingButton from "@/components/FloatingButton";
// import Categories from "@/components/categories/Categories";
// import Pagination from "@/components/Pagination";
// import { PRODUCTS_PER_PAGE } from "@/constants";
// import getCurrentUser from "../actions/getCurrentUser";

// interface ThemeSearchProps {
//   searchParams: ProductsParams;
// }

const ThemeSearch: React.FC<ThemeSearchProps> = () => {

  // async ({ searchParams }) => {
//   // 페이지네이션
//   const page = searchParams?.page;
//   const pageNum = typeof page === 'string' ? Number(page) : 1;
//   console.log('page', pageNum);

//   const products = await getProducts(searchParams);
//   const currentUser = await getCurrentUser();
//   console.log(products);

  return (
    <Container>
      <Categories />

      {products?.data.length === 0 ? (
        <EmptyState showReset />
      ) : (
        <>
          <GridContainer>
            {products?.data.map((product) => (
              <ProductCard
                currentUser={currentUser}
                key={product.id}
                data={product}
              />
            ))}
          </GridContainer>
        </>
      )}

      {/* <PaginationButtons page={pageNum} totalItems={products.totalItems} perPage={PRODUCTS_PER_PAGE} /> */}
    </Container>
  );
};

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;
  padding-top: 3rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1080px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1440px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 1920px) {
    grid-template-columns: repeat(6, 1fr);
  }
`;

export default ThemeSearch;
