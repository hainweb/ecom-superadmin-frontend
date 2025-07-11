 {/* Circular Progress and Category Revenue */}
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
 <div className="bg-white rounded-lg shadow p-6">
   <h2 className="text-lg font-semibold mb-4">Key Performance Indicators</h2>
   <div className="flex flex-wrap justify-around gap-4">
     <CircularProgress
       percentage={100}
       color="#3B82F6"
       label="Goal Progress"
     />
     <CircularProgress
       percentage={salesMetrics.conversionRate}
       color="#10B981"
       label="Conversion"
     />
     <CircularProgress
       percentage={10}
       color="#F59E0B"
       label="Satisfaction"
     />
   </div>
 </div>

 <div className="bg-white rounded-lg shadow p-6">
   <h2 className="text-lg font-semibold mb-4">Category Revenue</h2>
   <div className="h-80">
     <ResponsiveContainer width="100%" height="100%">
       <BarChart data={categoryData}>
         <CartesianGrid strokeDasharray="3 3" />
         <XAxis dataKey="name" />
         <YAxis />
         <Tooltip />
         <Bar dataKey="revenue" fill="#3B82F6" />
       </BarChart>
     </ResponsiveContainer>
   </div>
 </div>
</div>