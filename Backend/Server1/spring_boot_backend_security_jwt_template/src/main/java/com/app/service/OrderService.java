package com.app.service;

import java.util.List;

import com.app.dto.ApiResponse;
import com.app.pojo.Order;
import com.app.pojo.OrderDetail;

public interface OrderService {
	ApiResponse confirmPayment(Long id);
	List<Order> getOrders(Long userId);
	List<OrderDetail> getAllOrderDetails(Long orderId);
}
