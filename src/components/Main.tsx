import {useEffect, useState} from 'react';
import Filter from '@/components/Filter';
import CountryCard from '@/components/CountryCard';
import {fetchData} from '@/utils/api';

const svgLoader = (
	<svg
		aria-hidden="true"
		className="w-6 h-6 animate-spin fill-dblue-300 text-dgray-200"
		viewBox="0 0 100 101"
		fill="none"
		xmlns="http://www.w3.org/2000/svg">
		<path
			d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
			fill="currentColor"
		/>
		<path
			d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
			fill="currentFill"
		/>
	</svg>
);
type FilterType = {
	country: string;
	region: 'none' | 'Africa' | 'America' | 'Asia' | 'Europe' | 'Oceania';
};
type Props = {
	filter: FilterType;
	setFilter: any;
};
const Main = ({filter, setFilter}: Props) => {
	const [data, setData] = useState<any>([]);
	const [dataArray, setDataArray] = useState<any>([]);
	const [loadNumber, setLoadNumber] = useState<number>(8);
	const [loading, setLoading] = useState<boolean>(false);

	const loadData = async (value: string) => {
		setLoading(true);
		const loadedData = await fetchData(value);
		setData(loadedData === 'error' ? [] : loadedData);
		setLoading(false);
	};
	useEffect(() => {
		loadData('all?fields=name,flags,population,region,capital,cca3');
	}, []);
	useEffect(() => {
		// setDataArray(data);
		setDataArray(
			data.filter((item: any) => {
				if (
					item.name.common.toLowerCase().includes(filter.country.toLowerCase())
				) {
					if (filter.region === 'none' || item.region === filter.region) {
						return true;
					}
				}
			})
		);
		setLoadNumber(8);
	}, [data, filter]);

	return (
		<main className="px-mobile md:px-desktop py-6 md:py-12">
			<Filter
				filter={filter}
				setFilter={setFilter}
			/>
			<div className="flex flex-wrap justify-evenly items-stretch mt-8 md:mt-12 gap-y-10 gap-x-14">
				{dataArray.length > 0 ? (
					dataArray.slice(0, loadNumber).map((country: any) => (
						<CountryCard
							key={country.name.common}
							country={country}
						/>
					))
				) : (
					<p className="font-extrabold text-base w-full py-10 text-center text-dblue-300 dark:text-white">
						'No data found'
					</p>
				)}
			</div>
			{dataArray.length > 8 && (
				<button
					className="flex items-center justify-center gap-x-2 shadow-btn px-6 md:px-10 py-1.5 md:py-2 rounded-s text-base dark:bg-dblue-100 w-fit text-dblue-300 dark:text-white my-10 mx-auto"
					onClick={() => setLoadNumber((prev) => prev + 8)}>
					{loading ? svgLoader : 'Load More'}
				</button>
			)}
		</main>
	);
};

export default Main;
