const TextInput = ({ label, type, value, onChange, placeholder }) => {
    console.log('TextInput props:', { label, type, value, onChange, placeholder });
    return (
        <div className="flex flex-col gap-1 w-full">
            {label && <label className="pl-2">{label}</label>}
            <input
                type={type}
                className="mt-1 text-black border border-[#D4D4D4] rounded-lg px-2 py-1 bg-white bg-opacity-10 text-white"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    );
};

export default TextInput;