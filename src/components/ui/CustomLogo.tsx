import CustomImage from './CustomImage';

export default function Logo({ isActive }: { isActive: boolean }) {
  return (
    <div className="w-[200px]">
      <a href="/" className="flex items-center space-y-0 flex-col w-full">
        <CustomImage
          name={isActive ? 'logo_black' : 'logo_white'}
          alt="starmobiliario"
          className="object-contain transition-all duration-300 cursor-pointer !w-[auto] !h-[50px]"
        />
      </a>
    </div>
  );
}
